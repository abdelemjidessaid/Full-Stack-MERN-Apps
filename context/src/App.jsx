import Box from "./components/Box";
import Container from "./components/Container";
import ThemeContextProvider from "./contexts/ThemeContextProvider";

function App() {
  return (
    <ThemeContextProvider>
      <Container>
        <Box />
      </Container>
    </ThemeContextProvider>
  );
}

export default App;
