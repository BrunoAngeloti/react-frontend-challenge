import { render, screen } from "@testing-library/react";
import { act } from "react";
import { describe, expect, it, vi } from "vitest";

import { useDebounce } from "./use-debounce";

function TestComponent({ value }: { value: string }) {
  const debouncedValue = useDebounce(value, 500);

  return <span>{debouncedValue}</span>;
}

describe("useDebounce", () => {
  it("should delay value update", () => {
    vi.useFakeTimers();

    const { rerender } = render(<TestComponent value="batman" />);
    expect(screen.getByText("batman")).toBeInTheDocument();

    rerender(<TestComponent value="interstellar" />);
    expect(screen.getByText("batman")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(screen.getByText("interstellar")).toBeInTheDocument();

    vi.useRealTimers();
  });
});