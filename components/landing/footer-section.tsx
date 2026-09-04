export function Footer() 
{ return <footer className="border-t border-border">
    <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between lg:px-10">
        <span className="font-serif text-lg text-foreground">Myria Consulting</span>
        <span>Virtual management consulting for consequential decisions.</span>
        <span>© {new Date().getFullYear()} Myria Consulting</span>
    </div>
</footer> }
