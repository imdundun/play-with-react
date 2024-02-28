import { useState } from "react";
import Button from "~/components/Button";
import Layout from "~/components/Layout";
import Select from "~/components/Select";

interface User {
  name: string;
  gender: "male" | "female";
}

interface UserWithStatus extends User {
  removed: boolean;
}

const users: User[] = [
  { name: "Tanya Fox", gender: "female" },
  { name: "Wade Cooper", gender: "male" },
  { name: "Hellen Schmidt", gender: "female" },
  { name: "Arlene Mccoy", gender: "male" },
  { name: "Devon Webb", gender: "male" },
  { name: "Tom Cook", gender: "male" },
];

interface UserTableProps {
  data: UserWithStatus[];
  onAdd: (user: UserWithStatus) => void;
  onRemove: (user: UserWithStatus) => void;
}

function UsersTable({ data, onAdd, onRemove }: UserTableProps) {
  return (
    <div className="not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25">
      <div className="relative rounded-xl overflow-auto">
        <div className="shadow-sm overflow-hidden my-8">
          <table className="table-auto border-collapse w-full text-sm">
            <thead>
              <tr>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                  Name
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                  Gender
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                  Status
                </th>
                <th />
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800">
              {data.map((user) => {
                return (
                  <tr key={user.name}>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      {user.name}
                    </td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                      {user.gender}
                    </td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                      {user.gender === "female" &&
                        (user.removed ? "Removed" : "Added")}
                    </td>
                    <td className="border-b border-slate-100 dark:border-slate-700">
                      <Button
                        onClick={() =>
                          user.removed ? onAdd(user) : onRemove(user)
                        }
                      >
                        {user.removed ? "Add" : "Remove"}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="mt-2 mx-8 text-sm text-white">
            p/s: clicking "Remove" will change status of "female" user or remove
            "male" user
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Sample1() {
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<UserWithStatus[]>([]);

  return (
    <Layout title="Sample 1 (Select + Table)">
      <div className="space-y-2">
        <Select
          options={users.filter(
            (u1) => !selectedUsers.some((u2) => u1.name === u2.name)
          )}
          value={pendingUsers}
          onChange={setPendingUsers}
        />
        <Button
          onClick={() => {
            setSelectedUsers([
              ...selectedUsers,
              ...pendingUsers.map((u) => ({
                ...u,
                removed: false,
              })),
            ]);
            setPendingUsers([]);
          }}
        >
          Add selected users
        </Button>
        <UsersTable
          data={selectedUsers}
          onAdd={(user) => {
            switch (user.gender) {
              case "female":
                user.removed = false;
                return setSelectedUsers([...selectedUsers]);
            }
          }}
          onRemove={(user) => {
            switch (user.gender) {
              case "female":
                user.removed = true;
                return setSelectedUsers([...selectedUsers]);
              case "male":
                return setSelectedUsers(
                  selectedUsers.filter((u) => u !== user)
                );
            }
          }}
        />
        <Button
          onClick={() => console.log(selectedUsers.filter((u) => !u.removed))}
        >
          Submit
        </Button>
      </div>
    </Layout>
  );
}
