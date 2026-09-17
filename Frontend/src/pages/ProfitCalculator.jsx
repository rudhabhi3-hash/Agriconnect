import { useMemo, useState } from 'react'

const cropDefaults = {
  Tomato: {
    sellingPrice: 34,
    productionCost: 18,
    fertilizerCost: 2,
    labourCost: 3,
    transportCost: 4.5,
    handlingCost: 1,
    otherCost: 0.5,
  },
  Potato: {
    sellingPrice: 30,
    productionCost: 15,
    fertilizerCost: 1.8,
    labourCost: 2.5,
    transportCost: 4,
    handlingCost: 1,
    otherCost: 0.5,
  },
  Onion: {
    sellingPrice: 28,
    productionCost: 14,
    fertilizerCost: 2,
    labourCost: 2.5,
    transportCost: 3.5,
    handlingCost: 1,
    otherCost: 0.5,
  },
  Wheat: {
    sellingPrice: 26,
    productionCost: 12,
    fertilizerCost: 1.5,
    labourCost: 2,
    transportCost: 2.5,
    handlingCost: 1,
    otherCost: 0.5,
  },
  Rice: {
    sellingPrice: 32,
    productionCost: 16,
    fertilizerCost: 2,
    labourCost: 2.5,
    transportCost: 3,
    handlingCost: 1,
    otherCost: 0.5,
  },
}

const destinationData = {
  'Delhi NCR': {
    multiplier: 1,
    transport: 4.5,
    demand: 18,
  },
  Jaipur: {
    multiplier: 0.91,
    transport: 4,
    demand: 11,
  },
  Indore: {
    multiplier: 0.82,
    transport: 1.5,
    demand: 7,
  },
}

const money = (value) =>
  `₹${Math.round(value || 0).toLocaleString('en-IN')}`

export default function ProfitCalculator() {
  const [crop, setCrop] = useState('Tomato')
  const [quantity, setQuantity] = useState(20)

  const [sellingPrice, setSellingPrice] = useState(34)
  const [productionCost, setProductionCost] = useState(18)
  const [fertilizerCost, setFertilizerCost] = useState(2)
  const [labourCost, setLabourCost] = useState(3)
  const [transportCost, setTransportCost] = useState(4.5)
  const [handlingCost, setHandlingCost] = useState(1)
  const [otherCost, setOtherCost] = useState(0.5)

  const changeCrop = (value) => {
    setCrop(value)

    const d = cropDefaults[value]

    setSellingPrice(d.sellingPrice)
    setProductionCost(d.productionCost)
    setFertilizerCost(d.fertilizerCost)
    setLabourCost(d.labourCost)
    setTransportCost(d.transportCost)
    setHandlingCost(d.handlingCost)
    setOtherCost(d.otherCost)
  }

  const calculation = useMemo(() => {
    const tonnes = Number(quantity) || 0
    const kg = tonnes * 1000

    const selling = Number(sellingPrice) || 0
    const production = Number(productionCost) || 0
    const fertilizer = Number(fertilizerCost) || 0
    const labour = Number(labourCost) || 0
    const transport = Number(transportCost) || 0
    const handling = Number(handlingCost) || 0
    const other = Number(otherCost) || 0

    const totalCostPerKg =
      production +
      fertilizer +
      labour +
      transport +
      handling +
      other

    const revenue = kg * selling
    const totalCost = kg * totalCostPerKg
    const profit = revenue - totalCost

    const profitPerKg = kg > 0 ? profit / kg : 0

    const margin =
      revenue > 0
        ? (profit / revenue) * 100
        : 0

    const inputCosts = (production + fertilizer) * kg
    const labourCosts = labour * kg
    const logisticsCosts = (transport + handling + other) * kg

    return {
      kg,
      totalCostPerKg,
      revenue,
      totalCost,
      profit,
      profitPerKg,
      margin,
      inputCosts,
      labourCosts,
      logisticsCosts,
    }
  }, [
    quantity,
    sellingPrice,
    productionCost,
    fertilizerCost,
    labourCost,
    transportCost,
    handlingCost,
    otherCost,
  ])

  const destinations = useMemo(() => {
    const kg = (Number(quantity) || 0) * 1000
    const basePrice = Number(sellingPrice) || 0

    const production = Number(productionCost) || 0
    const fertilizer = Number(fertilizerCost) || 0
    const labour = Number(labourCost) || 0
    const handling = Number(handlingCost) || 0
    const other = Number(otherCost) || 0

    return Object.entries(destinationData)
      .map(([name, data]) => {
        const price = basePrice * data.multiplier

        const costPerKg =
          production +
          fertilizer +
          labour +
          data.transport +
          handling +
          other

        const revenue = kg * price
        const cost = kg * costPerKg
        const profit = revenue - cost

        return {
          name,
          price,
          transport: data.transport,
          demand: data.demand,
          costPerKg,
          revenue,
          cost,
          profit,
        }
      })
      .sort((a, b) => b.profit - a.profit)
  }, [
    quantity,
    sellingPrice,
    productionCost,
    fertilizerCost,
    labourCost,
    handlingCost,
    otherCost,
  ])

  const bestDestination = destinations[0]

  const totalCost = calculation.totalCost || 1

  const inputPercent =
    (calculation.inputCosts / totalCost) * 100

  const labourPercent =
    (calculation.labourCosts / totalCost) * 100

  const logisticsPercent =
    (calculation.logisticsCosts / totalCost) * 100

  return (
    <div className="profit-page">

      {/* HEADER */}

      <div className="profit-page-header">
        <div>
          <div className="profit-eyebrow">
            FARMER FINANCIAL INTELLIGENCE
          </div>

          <h1>Profit Calculator</h1>

          <p>
            Understand your complete cultivation cost and
            estimate the profit you can earn from your crop.
          </p>
        </div>

        <div className="profit-demo-badge">
          <span></span>
          DEMO MODE
        </div>
      </div>


      {/* TOP SUMMARY */}

      <div className="profit-top-stats">

        <div className="profit-stat-card">
          <span className="profit-stat-label">
            Total Revenue
          </span>

          <strong>
            {money(calculation.revenue)}
          </strong>

          <small>
            Expected market revenue
          </small>
        </div>


        <div className="profit-stat-card">
          <span className="profit-stat-label">
            Total Input Costs
          </span>

          <strong className="cost-number">
            {money(calculation.totalCost)}
          </strong>

          <small>
            All estimated expenses
          </small>
        </div>


        <div className="profit-stat-card main-profit-stat">
          <span className="profit-stat-label">
            Farmer's Total Profit
          </span>

          <strong>
            {money(calculation.profit)}
          </strong>

          <small>
            After all listed costs
          </small>
        </div>


        <div className="profit-stat-card">
          <span className="profit-stat-label">
            Profit Margin
          </span>

          <strong>
            {calculation.margin.toFixed(1)}%
          </strong>

          <small>
            Revenue retained as profit
          </small>
        </div>

      </div>


      {/* CALCULATOR + PROFIT CARD */}

      <div className="profit-main-grid">

        {/* INPUT PANEL */}

        <section className="profit-card">

          <div className="profit-card-header">
            <div>
              <span className="profit-section-number">
                01
              </span>

              <h2>Crop & Cost Details</h2>

              <p>
                Enter your expected selling price and
                estimated expenses.
              </p>
            </div>
          </div>


          <div className="profit-form-grid">

            <div className="profit-input-group">
              <label>Crop</label>

              <select
                value={crop}
                onChange={(e) =>
                  changeCrop(e.target.value)
                }
              >
                {Object.keys(cropDefaults).map((item) => (
                  <option key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>


            <div className="profit-input-group">
              <label>Quantity</label>

              <div className="input-with-unit">
                <input
                  type="number"
                  min="0"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(e.target.value)
                  }
                />

                <span>tonnes</span>
              </div>
            </div>


            <div className="profit-input-group">
              <label>Expected Selling Price</label>

              <div className="input-with-unit">
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={sellingPrice}
                  onChange={(e) =>
                    setSellingPrice(e.target.value)
                  }
                />

                <span>₹ / kg</span>
              </div>
            </div>


            <div className="profit-input-group">
              <label>Production Cost</label>

              <div className="input-with-unit">
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={productionCost}
                  onChange={(e) =>
                    setProductionCost(e.target.value)
                  }
                />

                <span>₹ / kg</span>
              </div>
            </div>


            <div className="profit-input-group">
              <label>Fertilizer Cost</label>

              <div className="input-with-unit">
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={fertilizerCost}
                  onChange={(e) =>
                    setFertilizerCost(e.target.value)
                  }
                />

                <span>₹ / kg</span>
              </div>
            </div>


            <div className="profit-input-group">
              <label>Labour Cost</label>

              <div className="input-with-unit">
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={labourCost}
                  onChange={(e) =>
                    setLabourCost(e.target.value)
                  }
                />

                <span>₹ / kg</span>
              </div>
            </div>


            <div className="profit-input-group">
              <label>Transport Cost</label>

              <div className="input-with-unit">
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={transportCost}
                  onChange={(e) =>
                    setTransportCost(e.target.value)
                  }
                />

                <span>₹ / kg</span>
              </div>
            </div>


            <div className="profit-input-group">
              <label>Handling / Storage</label>

              <div className="input-with-unit">
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={handlingCost}
                  onChange={(e) =>
                    setHandlingCost(e.target.value)
                  }
                />

                <span>₹ / kg</span>
              </div>
            </div>


            <div className="profit-input-group">
              <label>Other Costs</label>

              <div className="input-with-unit">
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={otherCost}
                  onChange={(e) =>
                    setOtherCost(e.target.value)
                  }
                />

                <span>₹ / kg</span>
              </div>
            </div>

          </div>

        </section>


        {/* PROFIT RESULT */}

        <section className="profit-result-card">

          <div className="result-card-top">
            <span>ESTIMATED FARMER PROFIT</span>

            <div className="result-icon">
              ₹
            </div>
          </div>


          <div className="big-profit-number">
            {money(calculation.profit)}
          </div>


          <p>
            Estimated net profit from{' '}
            <strong>{quantity || 0} tonnes</strong>{' '}
            of {crop}.
          </p>


          <div className="result-divider"></div>


          <div className="result-row">
            <span>Revenue</span>
            <strong>
              {money(calculation.revenue)}
            </strong>
          </div>

          <div className="result-row">
            <span>Total Costs</span>
            <strong>
              {money(calculation.totalCost)}
            </strong>
          </div>

          <div className="result-row">
            <span>Profit / kg</span>
            <strong>
              ₹{calculation.profitPerKg.toFixed(2)}
            </strong>
          </div>

          <div className="result-row">
            <span>Margin</span>
            <strong>
              {calculation.margin.toFixed(1)}%
            </strong>
          </div>

        </section>

      </div>


      {/* COST BREAKDOWN */}

      <section className="profit-card">

        <div className="profit-card-header">
          <div>
            <span className="profit-section-number">
              02
            </span>

            <h2>Cost Breakdown</h2>

            <p>
              See where the farmer's money is being spent.
            </p>
          </div>

          <div className="cost-total">
            Total Cost
            <strong>
              {money(calculation.totalCost)}
            </strong>
          </div>
        </div>


        <div className="cost-bar">

          <div
            className="cost-bar-input"
            style={{
              width: `${inputPercent}%`,
            }}
          />

          <div
            className="cost-bar-labour"
            style={{
              width: `${labourPercent}%`,
            }}
          />

          <div
            className="cost-bar-logistics"
            style={{
              width: `${logisticsPercent}%`,
            }}
          />

        </div>


        <div className="cost-breakdown-list">

          <div className="cost-breakdown-item">
            <div className="cost-item-name">
              <span className="cost-dot input-dot"></span>

              <div>
                <strong>Agricultural Inputs</strong>
                <small>
                  Production + Fertilizer
                </small>
              </div>
            </div>

            <div className="cost-item-value">
              {money(calculation.inputCosts)}
              <span>
                {inputPercent.toFixed(0)}%
              </span>
            </div>
          </div>


          <div className="cost-breakdown-item">
            <div className="cost-item-name">
              <span className="cost-dot labour-dot"></span>

              <div>
                <strong>Labour & Operations</strong>
                <small>
                  Farm labour
                </small>
              </div>
            </div>

            <div className="cost-item-value">
              {money(calculation.labourCosts)}
              <span>
                {labourPercent.toFixed(0)}%
              </span>
            </div>
          </div>


          <div className="cost-breakdown-item">
            <div className="cost-item-name">
              <span className="cost-dot logistics-dot"></span>

              <div>
                <strong>Logistics & Other</strong>
                <small>
                  Transport + handling + other
                </small>
              </div>
            </div>

            <div className="cost-item-value">
              {money(calculation.logisticsCosts)}
              <span>
                {logisticsPercent.toFixed(0)}%
              </span>
            </div>
          </div>

        </div>

      </section>


      {/* DESTINATION */}

      <section className="profit-card">

        <div className="profit-card-header">
          <div>
            <span className="profit-section-number">
              03
            </span>

            <h2>Where Should You Sell?</h2>

            <p>
              Compare estimated profit across different
              buyer markets.
            </p>
          </div>
        </div>


        <div className="destination-cards">

          {destinations.map((destination, index) => (

            <div
              key={destination.name}
              className={`destination-card ${
                index === 0
                  ? 'destination-best'
                  : ''
              }`}
            >

              {index === 0 && (
                <div className="destination-best-badge">
                  HIGHEST CALCULATED PROFIT
                </div>
              )}

              <div className="destination-top">
                <div>
                  <h3>
                    {destination.name}
                  </h3>

                  <span>
                    Demand growth +{destination.demand}%
                  </span>
                </div>

                <div className="destination-profit">
                  {money(destination.profit)}
                </div>
              </div>


              <div className="destination-details">

                <div>
                  <span>Market Price</span>
                  <strong>
                    ₹{destination.price.toFixed(2)}/kg
                  </strong>
                </div>

                <div>
                  <span>Transport</span>
                  <strong>
                    ₹{destination.transport.toFixed(2)}/kg
                  </strong>
                </div>

                <div>
                  <span>Total Cost</span>
                  <strong>
                    ₹{destination.costPerKg.toFixed(2)}/kg
                  </strong>
                </div>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* AI INSIGHT */}

      <section className="profit-ai-card">

        <div className="profit-ai-icon">
          ✦
        </div>

        <div className="profit-ai-content">

          <div className="profit-ai-title">
            AI PROFIT INSIGHT
          </div>

          <h3>
            {bestDestination.name} gives the highest
            calculated profit in this scenario.
          </h3>

          <p>
            For {quantity || 0} tonnes of {crop}, the
            estimated profit is{' '}
            <strong>
              {money(bestDestination.profit)}
            </strong>.
            The calculation considers market price,
            production, fertilizer, labour, transport,
            handling and other costs.
          </p>

          <div className="profit-ai-tags">

            <span>
              ✓ Cost aware
            </span>

            <span>
              ✓ Demand aware
            </span>

            <span>
              ✓ Logistics aware
            </span>

          </div>

        </div>

      </section>


      {/* FOOTER NOTE */}

      <div className="profit-prototype-note">

        <div>
          <strong>
            PROTOTYPE CALCULATION
          </strong>

          <span>
            Uses sample prices and cost assumptions for
            demonstration. Not a live market recommendation.
          </span>
        </div>

      </div>

    </div>
  )
}