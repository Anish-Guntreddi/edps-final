import { Button } from "@/components/ui/button";
import Image from "next/image";
import ListingMapView from "./_components/ListingMapView";

export default function Home() {
  return (
    <div className="px-10 p-10">
      <ListingMapView type="sell"/>
    </div>
  );
}
