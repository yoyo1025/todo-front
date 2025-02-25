import { signIn } from "@/auth"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


export default function Home() {
  return (
    <div className="h-screen w-screen flex justify-center items-center" >
      <Dialog>
        <DialogTrigger>
          <Button className="py-1 px-5 bg-sky-500 rounded-2xl text-white font-black  hover:bg-sky-700">Log in</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex justify-center my-5">Welcome Todo!</DialogTitle>
            <form
              action={async () => {
                "use server"
                await signIn("github", { callbackUrl: "/todo" })
              }}
              className="flex justify-center"
            >
              <Button className="py-2 px-4 bg-while rounded-2xl text-black font-black  hover:bg-sky-50">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" className="w-5 h-5"/>
                GitHubでログイン
              </Button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
