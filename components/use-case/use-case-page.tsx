import type { UseCase } from "@/data/use-cases";
import { UseCaseAdvisory } from "./use-case-advisory";
import { UseCaseCapabilities } from "./use-case-capabilities";
import { UseCaseChallenge } from "./use-case-challenge";
import { UseCaseDecisions } from "./use-case-decisions";
import { UseCaseFlow } from "./use-case-flow";
import { UseCaseFooter } from "./use-case-footer";
import { UseCaseHero } from "./use-case-hero";
import { UseCaseOutcomes } from "./use-case-outcomes";
export function UseCasePage({ useCase }: { useCase: UseCase }) { return <main className="min-h-screen bg-[#f6f1e7]"><UseCaseHero useCase={useCase}/><UseCaseChallenge useCase={useCase}/><UseCaseDecisions useCase={useCase}/><UseCaseCapabilities useCase={useCase}/><UseCaseFlow useCase={useCase}/><UseCaseOutcomes useCase={useCase}/><UseCaseAdvisory useCase={useCase}/><UseCaseFooter/></main> }
