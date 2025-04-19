import { ConfirmModal } from "@/components/modal/comfirm-modal";
import { Spinner } from "@/components/spinner";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Trash} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export function TrashBox () {
  const router = useRouter();
  const params = useParams();
  const notes = useQuery(api.notes.getTrash);
  const remove = useMutation(api.notes.remove);

const filteredDocuments = notes?.filter((note) => {
  return note.title.toLowerCase()
});



//   const onClick = (documentId: string) => {
//     router.push(`/documents/${documentId}`);
//   };


  const onRemove = (noteId: Id<"notes">) => {
    const promise = remove({ id: noteId });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: "Failed to delete note.",
    });

    if (params.id === noteId) {
      router.push("/");
    }
  };

  if (notes === undefined) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="text-sm">
      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
          No documents found
        </p>
        {filteredDocuments?.map((note) => (
          <div
            key={note._id}
            role="button"
            className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
          >
            <span className="cursor-pointer">{note.title}</span>
            <div className="flex items-center">
              <ConfirmModal onConfirm={() => onRemove(note._id)}>
                <div
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200"
                >
                  <Trash className="h-4 w-4 text-muted-foreground cursor-pointer" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
