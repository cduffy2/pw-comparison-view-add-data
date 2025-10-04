import logoImage from './assets/logo.png';

export default function Logo() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative size-full" data-name="Logo" data-node-id="I10714:36894;939:1635">
      <div className="flex flex-row items-center self-stretch">
        <img src={logoImage} alt="Pathways Logo" className="h-[36px] w-auto" />
      </div>
    </div>
  );
}
