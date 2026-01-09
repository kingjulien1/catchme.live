import { Button } from "@/components/ui/button";
import { CheckIcon, InstagramIcon, ShieldIcon } from "lucide-react";
import Section from "./Section";

/**
 * ConnectInstagramSection component to connect an Instagram account.
 * This section provides information about the benefits of connecting an Instagram account
 * and includes a button to initiate the connection process. It also highlights the data that will be accessed
 * and assures users about the safety of their account.
 *
 * @returns {JSX.Element} The rendered ConnectInstagramSection component.
 */
export default function ConnectInstagramSection() {
  return (
    <Section
      title="Connect Your Instagram Account"
      icon={<InstagramIcon className="h-4 w-4" />}
      subtitle="We’ll use your Instagram profile to verify your identity and populate your artist profile. Importing your details makes setup faster—no need to enter everything again."
    >
      <div className="mt-5 rounded-2xl border border-gray-200 bg-sky-50 p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 text-gray-700">
            <ShieldIcon color="blue" className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900">Your account stays safe</p>
            <p className="text-sm font-normal text-gray-600">We only access public profile information and never post without your permission - no edits, no posts, and you’re always in control. You can disconnect at any time.</p>

            <div className="mt-3 flex flex-wrap justify-around gap-2">
              {["Profile Name & Picture", "Bio & Links", "Public Posts & Stories"].map((pill) => (
                <span key={pill} className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-700">
                  <CheckIcon className="h-4 w-4 text-emerald-500" />
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-col-reverse sm:w-full">
        <div className="text-xs text-gray-500 text-center">
          By connecting, you agree to our <span className="text-fuchsia-700 hover:underline">Terms of Service</span> and <span className="text-fuchsia-700 hover:underline">Privacy Policy</span>.
        </div>

        <Button
          type="button"
          onClick={() => setConnected((v) => !v)}
          size="lg"
          className={"inline-flex items-center justify-center gap-2 rounded-xl px-4 py-4 text-sm font-semibold shadow-sm transition bg-linear-65 from-fuchsia-500 to-pink-500 text-white hover:opacity-80"}
        >
          <InstagramIcon className="h-5 w-5" />
          {"Connect with Instagram"}
        </Button>
      </div>
    </Section>
  );
}
