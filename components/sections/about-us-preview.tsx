import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function AboutUsPreview() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="order-2 flex flex-col justify-center space-y-4 md:order-1">
            <div className="space-y-2">
              <h2 className="text-3xl font-light tracking-tight sm:text-4xl">Naša priča</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                VSistem je osnovan 2010. godine, sa jednostavnom vizijom: stvaranje namještaja koja kombiniraju vremensku
                ljepotu i moderni komfor.
              </p>
            </div>
            <div className="space-y-4">
              <p>
              Naš rad ne završava kada se posljednji vijak učvrsti – on tada tek počinje da živi u domovima i prostorima koje opremamo. Svaki komad koji stvorimo nosi potpis preciznosti, strasti i vrhunske izrade. Bez obzira na to da li je riječ o jedinstvenom komadu po mjeri ili kompletnom enterijeru, VSistem ostaje vjeran svojoj misiji: stvarati namještaj koji traje, inspiriše i priča priču.
              </p>
            </div>
            <div className="pt-4">
              <Button asChild variant="outline" className="group">
                <Link href="/about">
                  Saznaj više o nama{" "}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="Our workshop and craftspeople"
              width={800}
              height={600}
              className="h-auto w-full rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
