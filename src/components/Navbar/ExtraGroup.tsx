export function ExtraGroup() {
  // const toSettings = ROUTE_URL.settings();
  // const toInfo = ROUTE_URL.info();
  return (
    <div className="flex w-full flex-col gap-1 px-2 pt-2 pb-6">
      <Info />
      {/* <ExtraGroupItem
        to={toSettings}
        title="Settings"
        icon={<IconSettings size={16} />}
      />
      <ExtraGroupItem
        to={toInfo}
        title="About"
        icon={<IconInfoCircle size={16} />}
      /> */}
    </div>
  );
}

function Info() {
  return (
    <div className="flex flex-col items-center gap-1 text-xs text-gray-500">
      <p>Created as side project by</p>
      <a
        href="https://www.linkedin.com/in/eduardjacko/"
        target="__blank"
        className="text-primary-600 underline"
      >
        Eduard Jacko
      </a>
    </div>
  );
}
