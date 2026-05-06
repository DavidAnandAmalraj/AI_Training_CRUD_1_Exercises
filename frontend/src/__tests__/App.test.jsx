import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "../App";

vi.mock("../api/customerApi", () => ({
  fetchCustomers: vi.fn(async () => [
    { id: 1, name: "John", email: "john@example.com", phone: "9999", city: "Chennai" }
  ]),
  addCustomer: vi.fn(async (payload) => ({ id: 2, ...payload })),
  editCustomer: vi.fn(async (id, payload) => ({ id, ...payload })),
  removeCustomer: vi.fn(async () => ({ message: "Customer deleted" }))
}));

describe("App", () => {
  test("renders and adds customer", async () => {
    render(<App />);

    expect(await screen.findByText("John")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Alice" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "alice@example.com" } });
    fireEvent.change(screen.getByLabelText("Phone"), { target: { value: "7777" } });
    fireEvent.change(screen.getByLabelText("City"), { target: { value: "Madurai" } });

    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    await waitFor(() => {
      expect(screen.getByText("Alice")).toBeInTheDocument();
    });
  });

  test("deletes customer", async () => {
    render(<App />);

    expect(await screen.findByText("John")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Delete" }));

    await waitFor(() => {
      expect(screen.queryByText("John")).not.toBeInTheDocument();
    });
  });
});
