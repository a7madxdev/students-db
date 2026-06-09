import {
  Pie,
  PieChart,
  PieLabelRenderProps,
  PieSectorShapeProps,
  Sector,
} from "recharts";
// import { RechartsDevtools } from '@recharts/devtools';

// #region Sample data
const data = [
  { name: "girls", value: 104 },
  { name: "boys", value: 79 },
];

// #endregion
const RADIAN = Math.PI / 180;
const COLORS = ["#FF0A54cc", "#2b7fff", "#FFBB28", "#FF8042"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > ncx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

const MyCustomPie = (props: PieSectorShapeProps) => {
  return <Sector {...props} fill={COLORS[props.index % COLORS.length]} />;
};

export default function PieChartWithCustomizedLabel({
  isAnimationActive = true,
}: {
  isAnimationActive?: boolean;
}) {
  return (
    <PieChart
      className="static"
      style={{
        width: "500px",
        maxWidth: "200px",
        maxHeight: "200px",
        aspectRatio: 1,
      }}
      responsive
    >
      <Pie
        data={data}
        labelLine={false}
        label={renderCustomizedLabel}
        fill="#8884d8"
        dataKey="value"
        isAnimationActive={isAnimationActive}
        shape={MyCustomPie}
      />
      {/* <RechartsDevtools /> */}
    </PieChart>
  );
}
