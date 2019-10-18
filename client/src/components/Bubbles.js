import React, { useState, useEffect } from "react";
import { Partition } from "@potion/layout";
import { Svg, Rect } from "@potion/element";

const Bubbles = ({ colors }) => {
  const [bubbleData, setBubbleData] = useState([]);
  useEffect(() => {
    const generateBubbleData = colors.map((_, i) => ({
      value: Math.floor(Math.random() * (colors.length * 2)) + 5,
      key: `${i + 1}`
    }));
    setBubbleData(generateBubbleData);
  }, [colors]);

  return (
    <div className="bubble-wrap">
      <p>bubbles</p>
      <Svg width={400} height={400}>
        <Partition
          data={{
            children: bubbleData
          }}
          sum={datum => datum.value}
          size={[400, 400]}
          includeRoot={false}
          nodeEnter={d => ({ ...d, r: 0 })}
          animate
        >
          {nodes =>
            nodes
              .map(({ x0, y0, x1, y1, key }, i) => {
                if (i < colors.length) {
                  return (
					<Rect
						key={key}
						x={x0}
						y={y0}
						width={x1 - x0}
						height={y1 - y0}
						fill={colors[i].code.hex}
						stroke="white"
					/>
                  );
                }
                return null;
              })
              .filter(v => v)
          }
        </Partition>
      </Svg>
    </div>
  );
};

export default Bubbles;
