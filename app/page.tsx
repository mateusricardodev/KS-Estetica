import { Apresentacao } from "@/components/Apresentacao";
import { BotaoFlutuante } from "@/components/BotaoFlutuante";
import { Cabecalho } from "@/components/Cabecalho";
import { ChamadaFinal } from "@/components/ChamadaFinal";
import { Galeria } from "@/components/Galeria";
import { Hero } from "@/components/Hero";
import { Localizacao } from "@/components/Localizacao";
import { Rodape } from "@/components/Rodape";
import { Servicos } from "@/components/Servicos";

export default function Pagina() {
  return (
    <>
      <Cabecalho />
      <main id="conteudo">
        <Hero />
        <Apresentacao />
        <Servicos />
        <Galeria />
        <ChamadaFinal />
        <Localizacao />
      </main>
      <Rodape />
      <BotaoFlutuante />
    </>
  );
}
