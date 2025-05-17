import { GradeCalculator } from "@/components/calculator/grade-calculator"
import { CalculatorHeader } from "@/components/calculator/calculator-header"

export default function CalculatorPage() {
  return (
    <div className="container mx-auto p-6">
      <CalculatorHeader />
      <div className="mt-6">
        <GradeCalculator />
      </div>
    </div>
  )
}
