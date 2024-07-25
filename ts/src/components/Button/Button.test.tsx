import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Given a Button component", () => {
  describe("When it's rendered with the text'Submit'", () => {
    test("Then it should show a Button with the text Submit", () => {
      const buttonText = "Submit";

      render(<Button text={buttonText} />);

      const button = screen.getByRole("button", { name: buttonText });

      expect(button).toBeInTheDocument();
    });
  });
});
