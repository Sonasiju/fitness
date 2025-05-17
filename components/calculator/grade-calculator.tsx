"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Calculator, AlertCircle, CheckCircle2 } from "lucide-react"

export function GradeCalculator() {
  const [internalMarks, setInternalMarks] = useState("")
  const [desiredTotal, setDesiredTotal] = useState("")
  const [desiredGrade, setDesiredGrade] = useState("")
  const [result, setResult] = useState<{
    requiredMarks: number
    percentage: number
    isPossible: boolean
    grade: string
  } | null>(null)

  const calculateByTotal = () => {
    if (!internalMarks || !desiredTotal) return

    const internal = Number.parseFloat(internalMarks)
    const desired = Number.parseFloat(desiredTotal)

    if (isNaN(internal) || isNaN(desired)) return
    if (internal < 0 || internal > 50 || desired < 0 || desired > 100) return

    const requiredMarks = desired - internal
    const isPossible = requiredMarks <= 50 && requiredMarks >= 0
    const percentage = desired

    let grade = ""
    if (percentage >= 90) grade = "A+"
    else if (percentage >= 80) grade = "A"
    else if (percentage >= 70) grade = "B"
    else if (percentage >= 60) grade = "C"
    else if (percentage >= 50) grade = "D"
    else grade = "F"

    setResult({
      requiredMarks: Math.max(0, requiredMarks),
      percentage,
      isPossible,
      grade,
    })
  }

  const calculateByGrade = () => {
    if (!internalMarks || !desiredGrade) return

    const internal = Number.parseFloat(internalMarks)
    if (isNaN(internal) || internal < 0 || internal > 50) return

    let minPercentage = 0
    switch (desiredGrade) {
      case "A+":
        minPercentage = 90
        break
      case "A":
        minPercentage = 80
        break
      case "B":
        minPercentage = 70
        break
      case "C":
        minPercentage = 60
        break
      case "D":
        minPercentage = 50
        break
      default:
        minPercentage = 40
    }

    const requiredMarks = minPercentage - internal
    const isPossible = requiredMarks <= 50 && requiredMarks >= 0

    setResult({
      requiredMarks: Math.max(0, requiredMarks),
      percentage: minPercentage,
      isPossible,
      grade: desiredGrade,
    })
  }

  const resetForm = () => {
    setInternalMarks("")
    setDesiredTotal("")
    setDesiredGrade("")
    setResult(null)
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calculator className="h-5 w-5 mr-2 text-primary" />
          Exam Marks Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="internalMarks">Your Internal Marks (out of 50)</Label>
            <Input
              id="internalMarks"
              type="number"
              min="0"
              max="50"
              placeholder="Enter your internal marks"
              value={internalMarks}
              onChange={(e) => setInternalMarks(e.target.value)}
            />
            {Number.parseFloat(internalMarks) > 50 && (
              <p className="text-sm text-destructive">Internal marks cannot exceed 50</p>
            )}
          </div>

          <Tabs defaultValue="total" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="total">Calculate by Total</TabsTrigger>
              <TabsTrigger value="grade">Calculate by Grade</TabsTrigger>
            </TabsList>
            <TabsContent value="total" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="desiredTotal">Desired Total Marks (out of 100)</Label>
                <Input
                  id="desiredTotal"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="Enter your desired total marks"
                  value={desiredTotal}
                  onChange={(e) => setDesiredTotal(e.target.value)}
                />
                {Number.parseFloat(desiredTotal) > 100 && (
                  <p className="text-sm text-destructive">Total marks cannot exceed 100</p>
                )}
              </div>
              <Button onClick={calculateByTotal} className="w-full">
                Calculate Required External Marks
              </Button>
            </TabsContent>
            <TabsContent value="grade" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="desiredGrade">Desired Grade</Label>
                <select
                  id="desiredGrade"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={desiredGrade}
                  onChange={(e) => setDesiredGrade(e.target.value)}
                >
                  <option value="" disabled>
                    Select a grade
                  </option>
                  <option value="A+">A+ (90-100%)</option>
                  <option value="A">A (80-89%)</option>
                  <option value="B">B (70-79%)</option>
                  <option value="C">C (60-69%)</option>
                  <option value="D">D (50-59%)</option>
                  <option value="E">E (40-49%)</option>
                </select>
              </div>
              <Button onClick={calculateByGrade} className="w-full">
                Calculate Required External Marks
              </Button>
            </TabsContent>
          </Tabs>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="border-t pt-4">
              <h3 className="font-medium text-lg mb-2">Results</h3>
              {result.isPossible ? (
                <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <AlertTitle className="text-green-800 dark:text-green-300">Good news!</AlertTitle>
                  <AlertDescription className="text-green-700 dark:text-green-400">
                    You need to score at least <strong>{Math.ceil(result.requiredMarks)}</strong> out of 50 in your
                    external exam to achieve a{" "}
                    <strong>
                      {result.grade} grade ({result.percentage}%)
                    </strong>
                    .
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert className="bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-900">
                  <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <AlertTitle className="text-amber-800 dark:text-amber-300">Not possible</AlertTitle>
                  <AlertDescription className="text-amber-700 dark:text-amber-400">
                    You would need <strong>{Math.ceil(result.requiredMarks)}</strong> marks in your external exam, which
                    exceeds the maximum of 50. Consider adjusting your target or focusing on other subjects.
                  </AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-muted p-4 rounded-md">
                  <p className="text-sm font-medium">Internal Marks</p>
                  <p className="text-2xl font-bold">{internalMarks}/50</p>
                </div>
                <div className="bg-muted p-4 rounded-md">
                  <p className="text-sm font-medium">Required External Marks</p>
                  <p className="text-2xl font-bold">{result.isPossible ? Math.ceil(result.requiredMarks) : "50+"}/50</p>
                </div>
                <div className="bg-muted p-4 rounded-md">
                  <p className="text-sm font-medium">Target Percentage</p>
                  <p className="text-2xl font-bold">{result.percentage}%</p>
                </div>
                <div className="bg-muted p-4 rounded-md">
                  <p className="text-sm font-medium">Target Grade</p>
                  <p className="text-2xl font-bold">{result.grade}</p>
                </div>
              </div>
            </div>

            <Button variant="outline" onClick={resetForm} className="w-full">
              Reset Calculator
            </Button>
          </div>
        )}

        <div className="bg-muted/50 p-4 rounded-md text-sm">
          <h4 className="font-medium mb-1">How this works:</h4>
          <p className="text-muted-foreground">
            This calculator helps you determine the minimum marks you need to score in your external exam (out of 50) to
            achieve your desired total marks or grade, based on your current internal marks (out of 50).
          </p>
          <h4 className="font-medium mt-3 mb-1">Grading Scale:</h4>
          <ul className="text-muted-foreground space-y-1">
            <li>A+: 90-100%</li>
            <li>A: 80-89%</li>
            <li>B: 70-79%</li>
            <li>C: 60-69%</li>
            <li>D: 50-59%</li>
            <li>E: 40-49%</li>
            <li>F: Below 40%</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
