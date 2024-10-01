import { useEffect, useRef, useState } from "react";
import * as css from "./history.css";
import { get } from "@ecowatch/utils";
import { BACKEND_URL } from "@/main";
import { schemaDayStatus } from "@/hooks/hookDayStatus";
import { z } from "zod";

const schemaDayStatusList = z.array(schemaDayStatus);

type ResponseStatusHistory = {
  [index: string]: {
    point: number;
  } | null;
};

type StatusHistory = ({ date: Date; point: number } | null)[];

const POINT_STEP = 500;

// if max point is 550, return 2.
const calcAmountMultiplier = (history: StatusHistory) => {
  let max = 0;
  for (const value of history) {
    if (value?.point && value?.point > max) {
      max = value?.point;
    }
  }
  return Math.ceil(max / POINT_STEP);
};

const drawNode = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  ctx.fillStyle = "#32bbf5";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(x, y, 6, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(x, y, 4, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
};

const GRAPH_HEIGHT = 280;

type NodePoint = { x: number; y: number };

const drawGraph = (canvas: HTMLCanvasElement, history: StatusHistory) => {
  const ctx = canvas.getContext("2d");
  if (!ctx || history.length === 0) {
    return;
  }
  canvas.width = 640;
  canvas.height = 300;
  const PADDING = 10;
  const X_GAP = (canvas.width - PADDING * 2) / history.length;
  const amountMultiplier = calcAmountMultiplier(history);
  console.log("canvas", canvas.width, canvas.height);

  const nodePoints: NodePoint[] = [];
  for (let i = 0; i < history.length; i++) {
    const day = history[i];
    if (!day) {
      continue;
    }
    const x = PADDING + X_GAP * i;
    const y = canvas.height - (day.point / (amountMultiplier * POINT_STEP)) * GRAPH_HEIGHT;
    nodePoints.push({ x, y });
  }

  for (let i = 1; i < nodePoints.length; i++) {
    const prevPoint = nodePoints[i - 1];
    const point = nodePoints[i];
    ctx.strokeStyle = "#32bbf5";
    ctx.beginPath();
    ctx.moveTo(prevPoint.x, prevPoint.y);
    ctx.lineTo(point.x, point.y);
    ctx.closePath();
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  for (const point of nodePoints) {
    drawNode(ctx, point.x, point.y);
  }
};

const HistoryPage = () => {
  const [history, setHistory] = useState<StatusHistory>([]);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    get(`${BACKEND_URL}/classroom/get_status_history`).then((res) => {
      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = "/login";
        }
        console.error(res.statusText);
        return;
      }
      res.json().then((data) => {
        const parsed = schemaDayStatusList.safeParse(data);
        if (parsed.success) {
          const history: ResponseStatusHistory = {};

          for (const value of parsed.data) {
            history[value.date] = { point: value.point };
          }

          // 過去30日
          const historyFull: StatusHistory = [];
          for (let i = 29; i >= 0; i--) {
            const targetDate = new Date();
            targetDate.setDate(targetDate.getDate() - i);

            const dateStr = targetDate.toLocaleDateString("sv-SE"); // スウェーデンの日付形式の標準はYYYY-MM-DD
            if (history[dateStr]) {
              // historyFull[dateStr] = history[dateStr];
              historyFull.push({ date: targetDate, point: history[dateStr].point });
            } else {
              // historyFull[dateStr] = null;
              historyFull.push(null);
            }
          }
          setHistory(historyFull);
          console.log(historyFull);
        }
      });
    });
  }, []);

  useEffect(() => {
    if (canvas.current) {
      drawGraph(canvas.current, history);
    }
  }, [history]);

  const amountMultiplier = calcAmountMultiplier(history);
  const leftPrefixes: JSX.Element[] = [];
  for (let i = amountMultiplier; i >= 0; i--) {
    const e = (
      <p className={css.graph_left_prefix} style={{ bottom: `${(GRAPH_HEIGHT / amountMultiplier) * i + 35}px` }} key={i}>
        {500 * i}
      </p>
    );
    leftPrefixes.push(e);
  }

  return (
    <div className={css.background}>
      <div className={css.header} />
      <h1 className={css.title}>これまでのデータ</h1>
      <div className={css.graph_container}>
        <div className={css.graph_left}>{leftPrefixes}</div>
        <div className={css.graph_inner_container}>
          <canvas className={css.graph} ref={canvas} />
          <div className={css.graph_bottom}></div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
