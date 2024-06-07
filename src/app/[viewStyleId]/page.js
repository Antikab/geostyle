import Header from '../components/Header';

export default function ViewStyle({ params }) {
  return (
    <>
      <Header title={`Стиль ${params.viewStyleId}`} />
    </>
  );
}
