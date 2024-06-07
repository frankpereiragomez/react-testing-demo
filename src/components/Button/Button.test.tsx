import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Given a Button component", () => {
  describe("When it's rendered with the text 'Login'", () => {
    test("Then it should show a button with the text 'Load more'", () => {
      const buttonText = "Load more";

      render(<Button text={buttonText} />);

      const expectedButton = screen.getByRole("button", { name: buttonText });

      expect(expectedButton).toBeInTheDocument();
    });
  });
});
