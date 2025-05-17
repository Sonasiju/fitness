import { SupportHeader } from "@/components/support/support-header"
import { SupportOptions } from "@/components/support/support-options"
import { AnonymousForm } from "@/components/support/anonymous-form"

export default function SupportPage() {
  return (
    <div className="container mx-auto p-6">
      <SupportHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <SupportOptions />
        <AnonymousForm />
      </div>
    </div>
  )
}
