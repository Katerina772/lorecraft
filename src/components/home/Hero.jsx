// import Button from "../ui/Button";
import heroImage from "../../assets/hero.png";
// export default function Hero() {
//   return (
//     <section className="relative bg-gradient-to-b from-primary/10 to-transparent pt-12 pb-16">
//       <div className="max-w-6xl mx-auto px-4 text-center">
//         <div className="mb-8">
//           <h1 className="text-5xl md:text-6xl font-heading font-bold text-text">
//             LoreCraft
//           </h1>
//           <p className="text-xl font-heading text-button mt-2 tracking-widest uppercase">
//             Create • Explore • Live Stories
//           </p>
//         </div>

//         {/* Ілюстрація-заглушка */}
//         <div className="max-w-2xl mx-auto mb-8">
//           {/* <div className="aspect-video bg-card rounded-2xl flex items-center justify-center text-text/30 text-2xl font-heading">
//             [велика ілюстрація]
//           </div> */}
//           <div className="max-w-4xl mx-auto mb-8">
//             <img
//               src={heroImage}
//               alt="Fantasy world"
//               className="w-full rounded-2xl shadow-xl object-cover"
//             />
//           </div>
//         </div>

//         <p className="text-lg font-body italic text-text/70 mb-4">
//           Every story begins with a choice...
//         </p>
//         <p className="text-md text-text/60 max-w-xl mx-auto mb-10">
//           Explore thousands of interactive quests created by authors from all
//           over the world.
//         </p>

//         <div className="flex justify-center gap-4">
//           <Button variant="primary">Explore</Button>
//           <Button variant="outline">Create</Button>
//         </div>
//       </div>
//     </section>
//   );
// }
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-primary/10 to-transparent pt-12 pb-16">
      {/* Контент, центрований з обмеженою шириною */}
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-text">
            LoreCraft
          </h1>
          <p className="text-xl font-heading text-button mt-2 tracking-widest uppercase">
            Create • Explore • Live Stories
          </p>
        </div>
      </div>

      {/* Ілюстрація на всю ширину */}
      <div className="w-full mb-8">
        <img
          src={heroImage}
          alt="Fantasy world"
          className="w-full rounded-2xl shadow-xl object-cover"
        />
      </div>

      {/* Решта тексту, центрована */}
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-lg font-body italic text-text/70 mb-4">
          Every story begins with a choice...
        </p>
        <p className="text-md text-text/60 max-w-xl mx-auto mb-10">
          Explore thousands of interactive quests created by authors from all
          over the world.
        </p>

        <div className="flex justify-center gap-4">
          <Button variant="primary">Explore</Button>
          <Button variant="outline">Create</Button>
        </div>
      </div>
    </section>
  );
}
