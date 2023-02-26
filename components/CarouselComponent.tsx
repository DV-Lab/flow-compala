import {
  CSSProperties,
  KeyboardEvent,
  MouseEvent,
  ReactChild,
  ReactNode,
} from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const CarouselComponent: IComponent<{
  className?: string;
}> = ({ children, className }) => {
  const indicatorStyles: CSSProperties = {
    background: "#fff",
    width: 48,
    height: 4,
    display: "inline-block",
    margin: "0 6px",
  };
  const renderIndicator:
    | ((
        clickHandler: (
          e: MouseEvent<Element, globalThis.MouseEvent> | KeyboardEvent<Element>
        ) => void,
        isSelected: boolean,
        index: number,
        label: string
      ) => ReactNode)
    | undefined = (clickHandler, isSelected, index, label) => {
    if (isSelected) {
      return <li style={{ ...indicatorStyles, background: "#2dd4bf" }} />;
    }
    return (
      <li
        style={indicatorStyles}
        onClick={clickHandler}
        onKeyDown={clickHandler}
        value={index}
        key={index}
        role="button"
        tabIndex={0}
      />
    );
  };
  return (
    <div className={className}>
      <Carousel renderIndicator={renderIndicator}>
        {children as ReactChild[]}
      </Carousel>
    </div>
  );
};
