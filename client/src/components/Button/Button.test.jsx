import { Delete } from "./Button.stories";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

test("should render", () => {
    render(<Delete {...Delete.args} />);
    expect(screen.getByRole("button")).toHaveTextContent(/fail/i);
});
