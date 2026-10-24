import { publicPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

import { FractionalCTOPage } from "@/services/fractional-cto/fractional-cto-page";

export const metadata = publicPageMetadata({"title":"Fractional CTO | Myria Consulting","description":"Archived information about the former Fractional CTO service.","pathname":"/services/fractional-cto","index":false});

export default function Page() {
  return <FractionalCTOPage />;
}
