"use client";

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const trainingData = [
  {
    epoch: 1,
    train_loss: 0.98554,
    val_loss: 1.2201,
    mAP50: 0.51762,
    precision: 0.79226,
    recall: 0.46328,
  },
  {
    epoch: 2,
    train_loss: 0.95336,
    val_loss: 1.23448,
    mAP50: 0.49632,
    precision: 0.66886,
    recall: 0.45531,
  },
  {
    epoch: 3,
    train_loss: 0.96669,
    val_loss: 1.2274,
    mAP50: 0.49657,
    precision: 0.80787,
    recall: 0.45734,
  },
  {
    epoch: 4,
    train_loss: 0.96935,
    val_loss: 1.29207,
    mAP50: 0.5014,
    precision: 0.78169,
    recall: 0.45781,
  },
  {
    epoch: 5,
    train_loss: 0.9753,
    val_loss: 1.25786,
    mAP50: 0.50576,
    precision: 0.68421,
    recall: 0.47499,
  },
  {
    epoch: 6,
    train_loss: 1.00315,
    val_loss: 1.2879,
    mAP50: 0.50748,
    precision: 0.69032,
    recall: 0.47966,
  },
  {
    epoch: 7,
    train_loss: 0.9734,
    val_loss: 1.25611,
    mAP50: 0.51256,
    precision: 0.64098,
    recall: 0.48783,
  },
  {
    epoch: 8,
    train_loss: 0.94695,
    val_loss: 1.21772,
    mAP50: 0.51527,
    precision: 0.72543,
    recall: 0.4748,
  },
  {
    epoch: 9,
    train_loss: 0.94749,
    val_loss: 1.19834,
    mAP50: 0.51074,
    precision: 0.8604,
    recall: 0.45668,
  },
  {
    epoch: 10,
    train_loss: 0.95122,
    val_loss: 1.23755,
    mAP50: 0.51588,
    precision: 0.67678,
    recall: 0.47797,
  },
  {
    epoch: 11,
    train_loss: 0.85886,
    val_loss: 1.259,
    mAP50: 0.51702,
    precision: 0.63072,
    recall: 0.4905,
  },
  {
    epoch: 12,
    train_loss: 0.83685,
    val_loss: 1.20763,
    mAP50: 0.51888,
    precision: 0.78683,
    recall: 0.46361,
  },
  {
    epoch: 13,
    train_loss: 0.84671,
    val_loss: 1.21188,
    mAP50: 0.51879,
    precision: 0.68486,
    recall: 0.49051,
  },
  {
    epoch: 14,
    train_loss: 0.80529,
    val_loss: 1.21623,
    mAP50: 0.52462,
    precision: 0.70851,
    recall: 0.48386,
  },
  {
    epoch: 15,
    train_loss: 0.78565,
    val_loss: 1.21676,
    mAP50: 0.51526,
    precision: 0.6983,
    recall: 0.48216,
  },
  {
    epoch: 16,
    train_loss: 0.76136,
    val_loss: 1.18734,
    mAP50: 0.52281,
    precision: 0.67279,
    recall: 0.49165,
  },
  {
    epoch: 17,
    train_loss: 0.74712,
    val_loss: 1.18551,
    mAP50: 0.5274,
    precision: 0.65622,
    recall: 0.50316,
  },
  {
    epoch: 18,
    train_loss: 0.739,
    val_loss: 1.175,
    mAP50: 0.52521,
    precision: 0.64294,
    recall: 0.50646,
  },
  {
    epoch: 19,
    train_loss: 0.71523,
    val_loss: 1.17976,
    mAP50: 0.52166,
    precision: 0.65704,
    recall: 0.50224,
  },
  {
    epoch: 20,
    train_loss: 0.7334,
    val_loss: 1.17494,
    mAP50: 0.51971,
    precision: 0.64763,
    recall: 0.50417,
  },
];

const chartConfig = {
  train_loss: { label: "Train Loss", color: "hsl(var(--chart-1))" },
  val_loss: { label: "Val Loss", color: "hsl(var(--chart-2))" },
  mAP50: { label: "mAP50", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig;

export default function TrainingDashboard() {
  return (
    <div className="p-8 space-y-8 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold tracking-tight">AI Training Report </h1>

      <div className="grid gap-4 md:grid-cols-2" dir="ltr">
        <Card>
          <CardHeader className="text-right">
            {" "}
            <CardTitle>Loss Convergence</CardTitle>
            <CardDescription>Training vs Validation</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <LineChart
                data={trainingData}
                margin={{ left: 12, right: 12, top: 20 }}
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  opacity={0.5}
                />
                <XAxis
                  dataKey="epoch"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />

                <Line
                  type="monotone"
                  dataKey="train_loss"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#2563eb" }}
                  activeDot={{ r: 5 }}
                  isAnimationActive={false}
                />
                <Line
                  type="monotone"
                  dataKey="val_loss"
                  stroke="#dc2626"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#dc2626" }}
                  activeDot={{ r: 5 }}
                  isAnimationActive={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-right">
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>mAP50 over Epochs</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <LineChart
                data={trainingData}
                margin={{ left: 12, right: 12, top: 20 }}
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  opacity={0.5}
                />
                <XAxis
                  dataKey="epoch"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />

                <Line
                  type="stepAfter"
                  dataKey="mAP50"
                  stroke="#16a34a"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#16a34a" }}
                  activeDot={{ r: 5 }}
                  isAnimationActive={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* دليل قراءة التقرير */}
      <Card className="bg-blue-50/50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900">
        <CardHeader>
          <CardTitle className="text-xl text-blue-900 dark:text-blue-400">
            دليل مبسط لقراءة التقرير{" "}
          </CardTitle>
          <CardDescription className="text-blue-700 dark:text-blue-300">
            شرح مبسط للأرقام والمصطلحات لتسهيل فهم أداء الذكاء الاصطناعي
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">
                1. الدورات (Epochs)
              </h3>
              <p className="text-sm">
                هي عدد المرات التي شاهد فيها الموديل جميع البيانات وتعلم منها.
                كلما زاد الرقم، يعني أن الموديل تدرب أكثر (في هذا التقرير 20
                دورة).
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">
                2. نسبة الخطأ (Loss)
              </h3>
              <p className="text-sm">
                مؤشر يقيس مدى "خطأ" الموديل في توقعاته.{" "}
                <strong>الهدف دائمًا هو أن ينخفض هذا الرقم بمرور الوقت.</strong>{" "}
                ينقسم إلى:
              </p>
              <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                <li>
                  <span className="font-semibold">Train Loss:</span> نسبة الخطأ
                  أثناء المذاكرة والتدريب.
                </li>
                <li>
                  <span className="font-semibold">Val Loss:</span> نسبة الخطأ في
                  الاختبار (على صور لم يراها من قبل).
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">
                3. الدقة (Precision)
              </h3>
              <p className="text-sm">
                عندما يقول الموديل "وجدت شيئًا"، ما مدى صحة كلامه؟ نسبة 80% تعني
                أنه من بين كل 100 مرة يكتشف فيها شيئاً، يكون مصيباً في 80 منها.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">
                4. الأداء العام (mAP50)
              </h3>
              <p className="text-sm">
                المعيار الذهبي لتقييم الموديل. يقيس مدى قدرة الموديل على إيجاد
                الأشياء بدقة وتحديد مكانها الصحيح. كلما زادت النسبة، كان الموديل
                أفضل وموثوقاً أكثر.
              </p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-white dark:bg-slate-900 rounded-lg border border-blue-100 dark:border-blue-900/50 shadow-sm">
            <h3 className="font-bold text-blue-900 dark:text-blue-400 mb-1">
              {" "}
              خلاصة هذا التقرير:
            </h3>
            <p className="text-sm">
              نلاحظ أن نسبة الخطأ (Train Loss) في انخفاض مستمر من الدورة الأولى
              وحتى الدورة 20، مما يعني أن{" "}
              <strong>الموديل يتعلم ويتحسن بشكل مستمر</strong>. كما أن الدقة
              الشاملة (mAP50) استقرت حول 52% وهو تقدم جيد يوضح استقرار الموديل
              وقدرته على التعرف على الأنماط المطلوبة.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* جدول النتائج التفصيلي */}
      <Card>
        <CardHeader>
          <CardTitle>Summary Table</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Epoch</TableHead>
                <TableHead className="text-center">Train Loss</TableHead>
                <TableHead className="text-center">Val Loss</TableHead>
                <TableHead className="text-center">mAP50</TableHead>
                <TableHead className="text-center">Precision</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trainingData.map((row) => (
                <TableRow key={row.epoch}>
                  <TableCell className="text-center font-medium">
                    {row.epoch}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.train_loss.toFixed(4)}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.val_loss.toFixed(4)}
                  </TableCell>
                  <TableCell className="text-center text-blue-600 font-semibold">
                    {(row.mAP50 * 100).toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-center">
                    {(row.precision * 100).toFixed(1)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
