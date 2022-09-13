
interface ButtonProps {
  title: string;
}

function Button({title}: ButtonProps) {
  return <button>{title}</button>;
}

function App() {
  return (
    <>
      <Button  title="Button 1"/>
      <Button  title="Button 2"/>
      <Button  title="Button 3"/>
      <Button  title="Button 4"/>
    </>
  );
}

export default App;
