// components/TodoItem.js

import Link from "next/link";

export default function TodoItem({ todo }) {
  return (
    <div>
      <Link href={`/todos/${todo.id}`}>
        {todo.title}
      </Link>
    </div>
  );
}