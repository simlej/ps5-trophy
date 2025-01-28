import html2canvas from "html2canvas"
import { DownloadIcon } from "lucide-react"
import { useReducer, useRef } from "react"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { Textarea } from "./components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "./components/ui/toggle-group"
import { formReducer, FormState } from "./lib/form-reducer"

function App() {

  const [state, dispatch] = useReducer(formReducer, { title: "Be yourself", description: "Trophy earned !", image: "", trophy: "gold" });

  const toDownloadRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64data = reader.result as string;
        dispatch({ type: 'set-image', payload: base64data }); // This will be the Base64 string
      };

      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const download = () => {
    const node = toDownloadRef.current;
    if (node) {
      html2canvas(node, { backgroundColor: null, scale: 4 }).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png'); // Convert canvas to PNG
        link.download = 'trophy.png'; // Set the filename
        link.click(); // Trigger the download
      })
    }
  }

  return (
    <div className='w-full md:h-screen flex flex-col md:flex-row'>
      <div className='w-full min-h-72 md:min-h-full md:w-2/3 flex items-center justify-center relative'>
        <div className="absolute left-0 right-0 bottom-0 flex items-center justify-center py-4">
          <Button onClick={() => download()}>
            <DownloadIcon />
            <span>Download</span>
          </Button>
        </div>
        <div ref={toDownloadRef} className="flex items-center justify-center p-10 bg-transparent">
          <div className="w-96 h-20 bg-gradient-to-r from-[#323234] to-[#1F1F1F] rounded-lg p-4 flex items-center gap-4">
            <div className="w-12 h-12 shrink-0">
              <img src={state.image || '/default.jpg'} alt="avatar" className="w-full h-full" />
            </div>
            <div className="font-extralight">
              <div className="flex items-start gap-2">
                <img src={`/${state.trophy}.png`} alt="avatar" className="h-5 translate-y-[2px]" />
                <span className="text-lg text-[#F3F3F3] truncate max-w-64">{state.title}</span>
              </div>
              <p className="text-sm text-[#A2A2A2] truncate max-w-72">{state.description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full md:w-1/3 bg-primary-foreground p-4 flex flex-col justify-between'>
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold">PS5 Trophy generator</h1>
          <div>
            <Label htmlFor="title">Trophy title</Label>
            <Input id="title" defaultValue={state.title} onChange={(e) => dispatch({ type: "set-title", payload: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="description">Trophy description</Label>
            <Textarea id="description" defaultValue={state.description} onChange={(e) => dispatch({ type: "set-description", payload: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="image">Trophy image</Label>
            <Input id="image" type="file" onChange={handleFileChange} />
          </div>
          <div>
            <Label>Trophy type</Label>
            <ToggleGroup variant="outline" className="mt-4 justify-between px-4" type="single" onValueChange={value => dispatch({ type: "set-trophy", payload: value as FormState['trophy'] })}>
              <ToggleGroupItem value="bronze" className="w-16 h-16" aria-label="Toggle bold">
                <img src="/bronze.png" alt="bronze" className="w-12" />
              </ToggleGroupItem>
              <ToggleGroupItem value="silver" className="w-16 h-16" aria-label="Toggle italic">
                <img src="/silver.png" alt="silver" className="w-12" />
              </ToggleGroupItem>
              <ToggleGroupItem value="gold" className="w-16 h-16" aria-label="Toggle underline">
                <img src="/gold.png" alt="gold" className="w-12" />
              </ToggleGroupItem>
              <ToggleGroupItem value="platinum" className="w-16 h-16" aria-label="Toggle underline">
                <img src="/platinum.png" alt="platinum" className="w-12" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
        <div className="flex items-center justify-end mt-8">
          <p>Made with 🎮 by <a href="https://www.simlej.dev/" target="_blank" rel="noreferrer">Simlej</a></p>
        </div>
      </div>
    </div>
  )
}

export default App
