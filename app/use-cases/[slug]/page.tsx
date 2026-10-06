import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UseCasePage } from "@/components/use-case";
import { getUseCase, useCases } from "@/data/use-cases";
export function generateStaticParams(){return useCases.map(({slug})=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const item=getUseCase(slug);if(!item)return {};return {title:`${item.title} | Myria Consulting`,description:item.description};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const item=getUseCase(slug);if(!item)notFound();return <UseCasePage useCase={item}/>;}
