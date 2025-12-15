import { auth } from "@/auth";
import InvitesTable from "./invitesTable";

async function InvitesComponent() {
  const session = await auth();
  if (!session) return null;
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Invites</h3>
      <InvitesTable session={session} />
    </div>
  );
}

export default InvitesComponent;
