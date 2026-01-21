import AppRouter from "./routes/AppRouter";
import "./App.scss";
import { ContentProvider } from "./content/ContentProvider.jsx"; // ajuste le chemin si besoin

function App() {
  return (
    <ContentProvider url="/content.json">
      <AppRouter />
    </ContentProvider>
  );
}

export default App;
