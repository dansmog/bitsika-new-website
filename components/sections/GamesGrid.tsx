import Container from "@/components/layout/Container";
import GameCard from "@/components/ui/GameCard";

import game1 from "@/assets/images/games/game_1.png";
import game2 from "@/assets/images/games/game_2.png";
import game3 from "@/assets/images/games/game_3.png";
import game4 from "@/assets/images/games/game_4.png";
import game5 from "@/assets/images/games/game_5.png";

const games = [
  {
    image: game1,
    title: "Call of Duty: Mobile",
    subtitle: "COD Points & Battle Pass",
  },
  {
    image: game2,
    title: "Honor of Kings",
    subtitle: "COD Points & Battle Pass",
  },
  { image: game3, title: "EA FC Mobile", subtitle: "COD Points & Battle Pass" },
  { image: game4, title: "Delta Force", subtitle: "COD Points & Battle Pass" },
  { image: game5, title: "Free Fire", subtitle: "COD Points & Battle Pass" },
  {
    image: game1,
    title: "Marvel Rivals",
    subtitle: "FIFA Points & Season Pass",
  },
  { image: game2, title: "Farlight 84", subtitle: "FIFA Points & Season Pass" },
  { image: game3, title: "PUBG Mobile", subtitle: "FIFA Points & Season Pass" },
  {
    image: game4,
    title: "Mobile Legends",
    subtitle: "FIFA Points & Season Pass",
  },
  {
    image: game5,
    title: "Asphalt Legends",
    subtitle: "FIFA Points & Season Pass",
  },
  { image: game1, title: "Lords Mobile", subtitle: "Cosmicube & Skins" },
  { image: game2, title: "Honor of Kings", subtitle: "Cosmicube & Skins" },
  { image: game3, title: "EA FC Mobile", subtitle: "Cosmicube & Skins" },
  { image: game4, title: "Delta Force", subtitle: "Cosmicube & Skins" },
  { image: game5, title: "Free Fire", subtitle: "Cosmicube & Skins" },
  {
    image: game1,
    title: "Marvel Rivals",
    subtitle: "FIFA Points & Season Pass",
  },
  { image: game2, title: "Farlight 84", subtitle: "FIFA Points & Season Pass" },
  { image: game3, title: "PUBG Mobile", subtitle: "FIFA Points & Season Pass" },
  {
    image: game4,
    title: "Mobile Legends",
    subtitle: "FIFA Points & Season Pass",
  },
  {
    image: game5,
    title: "Asphalt Legends",
    subtitle: "FIFA Points & Season Pass",
  },
];

export default function GamesGrid() {
  return (
    <section className="bg-surface-white pt-13.5 pb-13.25 md:pb-20">
      <Container>
        <div className="grid grid-cols-5 gap-y-8.75 gap-x-2.5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-sm:grid-cols-2">
          {games.map((game, index) => (
            <GameCard key={index} {...game} />
          ))}
        </div>
      </Container>
    </section>
  );
}
