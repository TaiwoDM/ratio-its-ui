'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { BellRing, Check } from "lucide-react"
 
import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Loader } from '@/components/loader/loader'


let quantities;
let total_value;
let sumOfParts;
let unitValue;
let solutions;
let notifications;

let dataParsed = {
  quantities: [
      2,
      3
  ],
  steps: [
      "Identify the parts of the ratio and their values.",
      "Add the parts of the ratio together.",
      "Divide the total value by the sum of the ratio parts to find the unit value.",
      "Multiply the unit value by each ratio part to get the final answers."
  ],
  hints: [
      "Look at the problem statement and note the ratio parts (e.g., 2:3).",
      "Add the parts of the ratio together. For example, 2 + 3 = 5.",
      "Divide the total value (e.g., 100) by the sum of the parts (5) to get the unit value.",
      "Multiply the unit value by each ratio part to get the final answers."
  ],
  total_value: 100,
  solutions: [
      40,
      60
  ]
}


console.log('dataParsed')
console.log(dataParsed)
 
export function CardDemo({ className, setStage, notifications }) {

  return (
    <Card className={cn("w-[380px]", className)}  >
      <CardHeader>
        <CardTitle>Step and hints</CardTitle>
        {/* <CardDescription>Please follow the procedures</CardDescription> */}
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* <div className=" flex items-center space-x-4 rounded-md border p-4">
          <BellRing />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Push Notifications
            </p>
            <p className="text-sm text-muted-foreground">
              Send notifications to device.
            </p>
          </div>
          <Switch />
        </div> */}
        <div>
          {notifications?.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => setStage(2)}>
          <Check /> View Solutions
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function RatioProblem() {


  const [total, setTotal] = useState('')
  const [result, setResult] = useState(null)


  const [stage, setStage] = useState(1)
  const [others, setothers] = useState(dataParsed)
  const [loading, setLoading] = useState(true)


  // const { quantities, total_value } = dataParsed;

  if(others) {

      quantities = others.quantities
      total_value = others.total_value
    
      sumOfParts = others?.quantities.reduce((a, b) => a + b, 0);
      unitValue = others?.total_value / sumOfParts;
      solutions = others?.quantities.map(part => part * unitValue);

      notifications = others?.steps.map((step, index) => {
        return {
          title: step,
          description: others.hints[index]
        };
      });

  }



  // fetch('https://ratio-its.onrender.com/get-ontology-data')
  // .then(res =>  res.json())
  // .then(data => {
  //   console.log('data')
  //   console.log(data)
  // })
useEffect(() => {
    
  fetch('https://ratio-its.onrender.com/get-ontology-data')
  .then(response => {
    // if (!response.ok) {
    //   throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    return response.json();
  })
  .then(data => {
  
    setothers(data)
    console.log('Received data:', data);

  })
  .catch(error => {
    console.error('Error fetching data:', error);
  })
  .finally(() => setLoading(false))

}, [])



  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">ITS</Link>
          <div className="space-x-4">
            <Link href="/" className="text-gray-600 hover:text-primary">Home</Link>
            <Link href="/ratio-problem" className="text-gray-600 hover:text-primary">Ratio Problem</Link>
          </div>
        </nav>
      </header>

      <div className='flex justify-center py-5 pb-10'>
        {
          stage === 2 
          ?
          <main className="flex-grow container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Ratio ITS</h1>
            {/* <p className="mb-4">Learn how to calculate parts of a whole using a 70:30 ratio.</p> */}

            {

            !loading
            ?
            <>
              <div>
                <h2 className="text-xl mb-4 pt-5">Step 1: Identify the parts of the ratio and their values.</h2>
                <h2 className="text-2xl font-semibold mb-4">{`The ratio is ${quantities.join(":")} with parts ${quantities[0]} and ${quantities[1]}.`}</h2>
              </div>

              <div>
                <h2 className="text-xl mb-4 pt-5">Step 2: Add the parts of the ratio together.</h2>
                <h2 className="text-2xl font-semibold mb-4">{`Sum of the ratio parts: ${quantities[0]} + ${quantities[1]} = ${sumOfParts && sumOfParts}`}</h2>
              </div>

              <div>
                <h2 className="text-xl mb-4 pt-5">Step 3: Divide the total value by the sum of the ratio parts to find the unit value.</h2>
                <h2 className="text-2xl font-semibold mb-4">{`Unit value = total_value / sum_of_parts = ${total_value && total_value} / ${sumOfParts && sumOfParts} = ${unitValue && unitValue}`}</h2>
              </div>
            </>
            :
            <Loader size={300} strokeWidth={1} />

            }


            <div>
              <h2 className="text-xl mb-4 pt-5">Step 4: Multiply the unit value by each ratio part to get the final answers.</h2>
              {
                solutions?.map((solution, index) => <h2 key={index} className="text-2xl font-semibold mb-4">{`Part ${quantities[index]} of the ratio: ${quantities[index]} * ${unitValue && unitValue} = ${solution}`}</h2>)
              }
            </div>

            <div>
              <h2 className="text-xl mb-4 pt-5">Final Solutions:</h2>
              <h2 className="text-2xl font-semibold mb-4">{`The calculated values are: ${solutions && solutions.join(" and ")}`}</h2>
            </div>

            {result && (
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Result:</h2>
                <p>70% (larger part): {result?.larger.toFixed(2)}</p>
                <p>30% (smaller part): {result?.smaller.toFixed(2)}</p>
              </div>
            )}

            {/* <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">How it works:</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>Enter the total amount in the input field.</li>
                <li>Click the "Calculate" button.</li>
                <li>The calculator will divide the total into two parts based on the 70:30 ratio.</li>
                <li>70% of the total will be assigned to the larger part.</li>
                <li>30% of the total will be assigned to the smaller part.</li>
              </ol>
            </div> */}
          </main>
          :
          <>
          {
          !loading
          ?
          <CardDemo setStage={setStage} notifications={notifications} />
          :
          <Loader size={300} />
          }
          
          </>
        }
      </div>

      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          &copy; 2024 Intelligent Tutoring System. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

