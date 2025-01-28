"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, BarChart2, Users } from "lucide-react"

// Add your API URL
const API_URL = "http://localhost:5000/api/detect-helmet"

export default function Dashboard() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      // Create preview URL for images
      if (selectedFile.type.startsWith("image/")) {
        setPreview(URL.createObjectURL(selectedFile))
      } else {
        setPreview(null)
      }
      setError(null)
      setResults(null)
    }
  }

  const handleAnalyze = async (event) => {
    event.preventDefault()
    if (!file) return

    setIsAnalyzing(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("image", file)

      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Analysis failed. Please try again.")
      }

      const data = await response.json()

      // Transform API response to match your dashboard's data structure
      const processedResults = {
        totalPeople: 1, // Update based on your model's output
        peopleWithHelmets: data.wearing_helmet ? 1 : 0,
        confidence: data.confidence,
        boundingBox: data.bounding_box,
      }

      setResults(processedResults)
    } catch (err) {
      setError(err.message)
      console.error("Analysis error:", err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  // Cleanup preview URL when component unmounts or file changes
  const cleanup = () => {
    if (preview) {
      URL.revokeObjectURL(preview)
    }
  }

  return (
    <div className="min-h-screen bg-purple-50 p-8">
      <h1 className="text-3xl font-bold text-purple-900 mb-8">
        Helmet Detection Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-purple-900 mb-4">
            Upload Media
          </h2>
          <form onSubmit={handleAnalyze}>
            <div className="mb-4">
              <label
                htmlFor="file-upload"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Choose a file
              </label>
              <input
                id="file-upload"
                name="file"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-purple-50 file:text-purple-700
                  hover:file:bg-purple-100"
              />
            </div>
            {preview && (
              <div className="mb-4 relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-w-full h-auto rounded-lg"
                />
                {results?.boundingBox && (
                  <div
                    className="absolute border-2 border-purple-500"
                    style={{
                      left: `${results.boundingBox[0]}px`,
                      top: `${results.boundingBox[1]}px`,
                      width: `${
                        results.boundingBox[2] - results.boundingBox[0]
                      }px`,
                      height: `${
                        results.boundingBox[3] - results.boundingBox[1]
                      }px`,
                    }}
                  />
                )}
              </div>
            )}
            <Button
              type="submit"
              disabled={!file || isAnalyzing}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze"}
              <Upload className="ml-2 h-5 w-5" />
            </Button>
          </form>
          {isAnalyzing && (
            <div className="mt-4">
              <Progress value={66} className="w-full" />
              <p className="text-sm text-gray-500 mt-2">
                Analyzing your media...
              </p>
            </div>
          )}
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-purple-900 mb-4">
            Analysis Results
          </h2>
          {results ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-700">Total People Detected:</span>
                <span className="text-2xl font-bold text-purple-900">
                  {results.totalPeople}
                </span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-700">People Wearing Helmets:</span>
                <span className="text-2xl font-bold text-green-600">
                  {results.peopleWithHelmets}
                </span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-700">People Without Helmets:</span>
                <span className="text-2xl font-bold text-red-600">
                  {results.totalPeople - results.peopleWithHelmets}
                </span>
              </div>
              <Progress
                value={(results.peopleWithHelmets / results.totalPeople) * 100}
                className="w-full h-4 mb-2"
              />
              <p className="text-sm text-gray-500 text-center">
                {(
                  (results.peopleWithHelmets / results.totalPeople) *
                  100
                ).toFixed(1)}
                % compliance rate
              </p>
            </div>
          ) : (
            <p className="text-gray-500">
              Upload a file to see analysis results.
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-purple-900">
              Safety Score
            </h3>
            <BarChart2 className="h-6 w-6 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-purple-900 mt-2">
            {results
              ? (
                  (results.peopleWithHelmets / results.totalPeople) *
                  100
                ).toFixed(1)
              : "0"}
            %
          </p>
          <p className="text-sm text-gray-500 mt-1">Based on latest analysis</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-purple-900">
              Total Analyzed
            </h3>
            <Users className="h-6 w-6 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-purple-900 mt-2">
            {results ? results.totalPeople : "0"}
          </p>
          <p className="text-sm text-gray-500 mt-1">People in latest upload</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-purple-900">
              Helmet Usage
            </h3>
            <svg
              className="h-6 w-6 text-purple-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"></path>
              <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"></path>
              <path d="M4 15v-3a6 6 0 0 1 6-6h0"></path>
              <path d="M14 6h0a6 6 0 0 1 6 6v3"></path>
            </svg>
          </div>
          <p className="text-3xl font-bold text-purple-900 mt-2">
            {results ? results.peopleWithHelmets : "0"}
          </p>
          <p className="text-sm text-gray-500 mt-1">People wearing helmets</p>
        </div>
      </div>
    </div>
  )
}

// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Progress } from "@/components/ui/progress"
// import { Upload, BarChart2, Users } from "lucide-react"

// export default function Dashboard() {
//   const [file, setFile] = useState(null)
//   const [isAnalyzing, setIsAnalyzing] = useState(false)
//   const [results, setResults] = useState(null)

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files?.[0]
//     if (selectedFile) {
//       setFile(selectedFile)
//     }
//   }

//   const handleAnalyze = async (event) => {
//     event.preventDefault()
//     if (!file) return

//     setIsAnalyzing(true)

//     // Simulate analysis process
//     await new Promise((resolve) => setTimeout(resolve, 2000))

//     // Generate mock results
//     const mockResults = {
//       totalPeople: Math.floor(Math.random() * 20) + 1,
//       peopleWithHelmets: Math.floor(Math.random() * 15) + 1,
//     }

//     setResults(mockResults)
//     setIsAnalyzing(false)
//   }

//   return (
//     <div className="min-h-screen bg-purple-50 p-8">
//       <h1 className="text-3xl font-bold text-purple-900 mb-8">
//         Helmet Detection Dashboard
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold text-purple-900 mb-4">
//             Upload Media
//           </h2>
//           <form onSubmit={handleAnalyze}>
//             <div className="mb-4">
//               <label
//                 htmlFor="file-upload"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Choose a file
//               </label>
//               <input
//                 id="file-upload"
//                 name="file"
//                 type="file"
//                 accept="image/*,video/*"
//                 onChange={handleFileChange}
//                 className="block w-full text-sm text-gray-500
//                   file:mr-4 file:py-2 file:px-4
//                   file:rounded-full file:border-0
//                   file:text-sm file:font-semibold
//                   file:bg-purple-50 file:text-purple-700
//                   hover:file:bg-purple-100"
//               />
//             </div>
//             <Button
//               type="submit"
//               disabled={!file || isAnalyzing}
//               className="w-full bg-purple-600 hover:bg-purple-700 text-white"
//             >
//               {isAnalyzing ? "Analyzing..." : "Analyze"}
//               <Upload className="ml-2 h-5 w-5" />
//             </Button>
//           </form>
//           {isAnalyzing && (
//             <div className="mt-4">
//               <Progress value={66} className="w-full" />
//               <p className="text-sm text-gray-500 mt-2">
//                 Analyzing your media...
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold text-purple-900 mb-4">
//             Analysis Results
//           </h2>
//           {results ? (
//             <div>
//               <div className="flex items-center justify-between mb-4">
//                 <span className="text-gray-700">Total People Detected:</span>
//                 <span className="text-2xl font-bold text-purple-900">
//                   {results.totalPeople}
//                 </span>
//               </div>
//               <div className="flex items-center justify-between mb-4">
//                 <span className="text-gray-700">People Wearing Helmets:</span>
//                 <span className="text-2xl font-bold text-green-600">
//                   {results.peopleWithHelmets}
//                 </span>
//               </div>
//               <div className="flex items-center justify-between mb-4">
//                 <span className="text-gray-700">People Without Helmets:</span>
//                 <span className="text-2xl font-bold text-red-600">
//                   {results.totalPeople - results.peopleWithHelmets}
//                 </span>
//               </div>
//               <Progress
//                 value={(results.peopleWithHelmets / results.totalPeople) * 100}
//                 className="w-full h-4 mb-2"
//               />
//               <p className="text-sm text-gray-500 text-center">
//                 {(
//                   (results.peopleWithHelmets / results.totalPeople) *
//                   100
//                 ).toFixed(1)}
//                 % compliance rate
//               </p>
//             </div>
//           ) : (
//             <p className="text-gray-500">
//               Upload a file to see analysis results.
//             </p>
//           )}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <div className="flex items-center justify-between">
//             <h3 className="text-lg font-semibold text-purple-900">
//               Safety Score
//             </h3>
//             <BarChart2 className="h-6 w-6 text-purple-600" />
//           </div>
//           <p className="text-3xl font-bold text-purple-900 mt-2">
//             {results
//               ? (
//                   (results.peopleWithHelmets / results.totalPeople) *
//                   100
//                 ).toFixed(1)
//               : "0"}
//             %
//           </p>
//           <p className="text-sm text-gray-500 mt-1">Based on latest analysis</p>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <div className="flex items-center justify-between">
//             <h3 className="text-lg font-semibold text-purple-900">
//               Total Analyzed
//             </h3>
//             <Users className="h-6 w-6 text-purple-600" />
//           </div>
//           <p className="text-3xl font-bold text-purple-900 mt-2">
//             {results ? results.totalPeople : "0"}
//           </p>
//           <p className="text-sm text-gray-500 mt-1">People in latest upload</p>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <div className="flex items-center justify-between">
//             <h3 className="text-lg font-semibold text-purple-900">
//               Helmet Usage
//             </h3>
//             <svg
//               className="h-6 w-6 text-purple-600"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"></path>
//               <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"></path>
//               <path d="M4 15v-3a6 6 0 0 1 6-6h0"></path>
//               <path d="M14 6h0a6 6 0 0 1 6 6v3"></path>
//             </svg>
//           </div>
//           <p className="text-3xl font-bold text-purple-900 mt-2">
//             {results ? results.peopleWithHelmets : "0"}
//           </p>
//           <p className="text-sm text-gray-500 mt-1">People wearing helmets</p>
//         </div>
//       </div>
//     </div>
//   )
// }
