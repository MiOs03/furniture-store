"use client"

import { useEffect, useState } from "react"
import CountUp from "react-countup"
import { useInView } from "react-intersection-observer"

export default function StatsSection() {
  const [hasAnimated, setHasAnimated] = useState(false)
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [inView, hasAnimated])

  const stats = [
    {
      number: 2000,
      label: "Satisfied Customers",
      prefix: "Over",
    },
    {
      number: 500,
      label: "Products Manufactured Annually",
      prefix: "More than",
    },
    {
      number: 300,
      label: "Successful Deliveries",
      prefix: "Over",
    },
  ]

  return (
    <section className="bg-white py-16 md:py-24" ref={ref}>
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center rounded-lg border border-stone-100 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex flex-col gap-1">
                  <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                    {stat.prefix}
                  </span>
                  <div className="text-4xl font-light tracking-tight sm:text-5xl">
                    {hasAnimated ? (
                      <CountUp
                        end={stat.number}
                        duration={2.5}
                        separator=","
                        enableScrollSpy
                        scrollSpyOnce
                      />
                    ) : (
                      <span className="text-transparent">0</span>
                    )}
                  </div>
                </div>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 