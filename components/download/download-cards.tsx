import { Apple, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function DownloadCards() {
  return (
    <div className="mb-20">
      <h2 className="font-mono text-2xl font-bold mb-6 text-center">
        Choose Your Platform
      </h2>
      <div className="grid md:grid-cols-3 gap-4">
        {/* macOS */}
        <Card className="p-6 hover:border-primary transition-colors cursor-pointer group">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <Apple className="w-8 h-8" />
            </div>
            <div className="text-center">
              <p className="font-mono font-semibold mb-1">macOS</p>
              <p className="text-sm text-muted-foreground font-sans">
                Intel & Apple Silicon
              </p>
            </div>
            <Button className="w-full font-mono" variant="default">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </Card>

        {/* Windows */}
        <Card className="p-6 hover:border-primary transition-colors cursor-pointer group">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
              </svg>
            </div>
            <div className="text-center">
              <p className="font-mono font-semibold mb-1">Windows</p>
              <p className="text-sm text-muted-foreground font-sans">x64</p>
            </div>
            <Button className="w-full font-mono" variant="default">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </Card>

        {/* Linux */}
        <Card className="p-6 hover:border-primary transition-colors cursor-pointer group">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.84-.41 1.684-.287 2.489.107.714.32 1.423.63 2.093.096.21.198.414.304.615.107.2.221.39.343.573.243.364.514.704.81 1.017.593.627 1.249 1.141 1.94 1.563.138.084.28.162.427.237.147.074.297.143.452.207.31.13.63.241.961.334.165.046.334.086.505.121.342.07.689.117 1.043.143.071.006.143.009.215.009.143 0 .288-.003.431-.011.357-.021.711-.066 1.061-.139.175-.037.348-.08.518-.13.34-.1.674-.219 1.001-.361.163-.071.324-.146.483-.228.319-.164.626-.347.921-.549.295-.203.576-.426.841-.67.133-.122.26-.25.38-.385.241-.271.462-.559.663-.863.201-.304.379-.625.535-.96.078-.167.148-.338.21-.513.124-.349.223-.711.294-1.084.035-.186.062-.375.081-.568.038-.388.045-.782.021-1.175-.012-.197-.029-.394-.052-.59-.046-.392-.12-.78-.222-1.158-.051-.19-.109-.375-.174-.557-.259-.725-.655-1.379-1.166-1.946-.255-.283-.542-.535-.853-.753-.155-.109-.319-.206-.489-.292-.085-.043-.173-.083-.263-.12-.18-.075-.367-.14-.558-.195l-.098-.027c-.582-.155-1.183-.233-1.791-.233-.609 0-1.212.078-1.794.233l-.098.027c-.192.055-.378.12-.558.195-.09.037-.178.077-.263.12-.17.086-.334.183-.489.292-.311.218-.598.47-.853.753-.511.567-.907 1.221-1.166 1.946-.065.182-.123.367-.174.557-.102.378-.176.766-.222 1.158-.023.196-.04.393-.052.59-.024.393-.017.787.021 1.175.019.193.046.382.081.568.071.373.17.735.294 1.084.062.175.132.346.21.513.156.335.334.656.535.96.201.304.422.592.663.863.12.135.247.263.38.385.265.244.546.467.841.67.295.202.602.385.921.549.159.082.32.157.483.228.327.142.661.261 1.001.361.17.05.343.093.518.13.35.073.704.118 1.061.139.143.008.288.011.431.011.072 0 .144-.003.215-.009.354-.026.701-.073 1.043-.143.171-.035.34-.075.505-.121.331-.093.651-.204.961-.334.155-.064.305-.133.452-.207.147-.075.289-.153.427-.237.691-.422 1.347-.936 1.94-1.563.296-.313.567-.653.81-1.017.122-.183.236-.373.343-.573.106-.201.208-.405.304-.615.31-.67.523-1.379.63-2.093.123-.805-.009-1.649-.287-2.489-.589-1.771-1.831-3.47-2.716-4.521-.75-1.067-.974-1.928-1.05-3.02-.065-1.491 1.056-5.965-3.17-6.298-.165-.013-.325-.021-.48-.021z" />
              </svg>
            </div>
            <div className="text-center">
              <p className="font-mono font-semibold mb-1">Linux</p>
              <p className="text-sm text-muted-foreground font-sans">x64</p>
            </div>
            <Button className="w-full font-mono" variant="default">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
