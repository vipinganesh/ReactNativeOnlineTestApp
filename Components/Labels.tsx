import { Text } from "react-native-svg";

interface labelProps {
  slices?: any;
  height?: any;
  width?: any;
}

export const Labels = ({ slices, height, width }: labelProps) => {
  return slices.map((slice, index) => {
    const { labelCentroid, pieCentroid, data } = slice;
    const labelAngle =
      Math.atan2(labelCentroid[1], labelCentroid[0]) + Math.PI / 2;
    return (
      <Text
        key={index}
        transform={
          `translate(${labelCentroid[0]}, ${labelCentroid[1]})` +
          `rotate(${(360 * labelAngle) / (2 * Math.PI)})`
        }
        fill={"#000"}
        textAnchor={"middle"}
        alignmentBaseline={"center"}
        fontSize={14}
        stroke={"black"}
        strokeWidth={0.2}
      >
        {data.key.split(" ")[data.key.split(" ").length - 1] == 0
          ? ""
          : data.key}
      </Text>
    );
  });
};
