import { useEffect, useState } from "react"
import { getCrops } from "../services/api"

const BackendTest = () => {
  const [crops, setCrops] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadCrops = async () => {
      try {
        const result = await getCrops()
        setCrops(result.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadCrops()
  }, [])

  if (loading) {
    return <p>Loading crops from AgriConnect backend...</p>
  }

  if (error) {
    return <p>Backend error: {error}</p>
  }

  return (
    <div>
      <h2>Live Crops from Supabase</h2>

      {crops.map(crop => (
        <p key={crop.id}>
          {crop.name} — {crop.category}
        </p>
      ))}
    </div>
  )
}

export default BackendTest