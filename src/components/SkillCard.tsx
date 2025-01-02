import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

type SkillCardProps = {
  title: string;
  img: string;
  className?: string;
};
export const SkillCard = ({ title, img, className }: SkillCardProps) => {
  return (
    <div className={cn("flex-grow p-2", className)}>
      <Card className="flex flex-col items-center justify-center p-5 h-60 hover:-motion-translate-y-out-[10px]">
        <CardContent className="h-48 flex items-center">
          <Image src={img} alt={title} width={80} height={80} />
        </CardContent>

        <CardFooter className="justify-center">
          <CardTitle>{title}</CardTitle>
        </CardFooter>
      </Card>
    </div>
  );
};