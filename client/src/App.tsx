import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import UnderConstruction from "@/pages/UnderConstruction";

function Router() {
  return (
    <WouterRouter base="/Allianz-Dog">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/vorteile" component={UnderConstruction} />
        <Route path="/tarife" component={UnderConstruction} />
        <Route path="/ueber-uns" component={UnderConstruction} />
        <Route path="/hundekrankenversicherung" component={UnderConstruction} />
        <Route path="/hundehaftpflicht" component={UnderConstruction} />
        <Route path="/katzenkrankenversicherung" component={UnderConstruction} />
        <Route path="/op-schutz" component={UnderConstruction} />
        <Route path="/impressum" component={UnderConstruction} />
        <Route path="/datenschutz" component={UnderConstruction} />
        <Route path="/agb" component={UnderConstruction} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
