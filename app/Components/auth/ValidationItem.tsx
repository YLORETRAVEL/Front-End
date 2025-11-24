export function ValidationItem({ title, valid }: { title: string; valid: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`text-sm ${valid ? "text-green-600" : "text-red-500"}`}>
        {valid ? "✔" : "✖"}
      </span>
      <span className={`text-xs ${valid ? "text-green-600" : "text-gray-500"}`}>
        {title}
      </span>
    </div>
  );
}
