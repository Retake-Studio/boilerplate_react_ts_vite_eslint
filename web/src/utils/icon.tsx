import { useEffect, useState } from "react";

type IconProps = {
  id?: string;
  style?: React.CSSProperties;
  fill?: string;
};

/**
 * Icon component to display an image or SVG icon.
 *
 * @param {Object} props - The properties for the Icon component.
 * @param {string} [props.id=""] - The identifier for the icon, which can be a PNG or SVG file name.
 * @param {React.CSSProperties} [props.style] - Optional styles to apply to the icon.
 * @param {string} [props.fill] - Optional fill color for the SVG icon.
 *
 * @returns {JSX.Element | null} The rendered icon or null if no icon is provided.
 */
export function Icon({ id = "", style, fill }: IconProps) {
  const [iconContent, setIconContent] = useState<string | null>(null);
  const [isImage, setIsImage] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      const extension = id.split(".").pop()?.toLowerCase();
      if (extension === "png") {
        setIsImage(true);
        const img = new Image();
        img.onload = () => {
          setIconContent(`./icons/${id}`);
          setError(false);
        };
        img.onerror = (error) => {
          console.error("Error loading icon:", error);
          setError(true);
        };
        img.src = `./icons/${id}`;
      } else {
        fetch(`./icons/${id}.svg`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Icon ${id} does not exist`);
            }
            return response.text();
          })
          .then((data) => {
            setIconContent(data);
            setIsImage(false);
            setError(false);
          })
          .catch((error) => {
            console.error("Error loading icon:", error);
            setError(true);
          });
      }
    }
  }, [id]);

  if (error) {
    return <Icon id="Error" style={{ ...style, color: "red" }} fill="red" />;
  }

  if (!iconContent) {
    return null;
  }

  if (isImage) {
    return <img src={iconContent} style={style} alt={id} />;
  }

  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(iconContent, "image/svg+xml");
  const svgElement = svgDoc.documentElement;

  if (svgElement.tagName.toLowerCase() !== "svg") {
    return <Icon id="Error" style={{ ...style, color: "red" }} fill="red" />;
  }

  if (fill) {
    svgElement.setAttribute("fill", fill);
  }

  Object.assign(svgElement.style, style);

  return (
    <span
      style={{ display: "inline-flex" }}
      dangerouslySetInnerHTML={{ __html: svgElement.outerHTML }}
    />
  );
}
