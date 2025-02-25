import PolicyTermsDialog from "@/components/policy-terms-dialog/policy-terms-dialog";
import { Dialog } from "@mui/material";
import { useRouter } from "next/router";
import { useState, useCallback } from "react";

export default function PolicyTermsPage() {
    const [isPolicyDialogOpen, setIsPolicyDialogOpen] = useState<boolean>(true);
    const router = useRouter();

    const handleClose = useCallback(() => {
        setIsPolicyDialogOpen(false);
        router.push('/');
    }, [router]);

    return (
        <Dialog open={isPolicyDialogOpen}>
            <PolicyTermsDialog handleClose={handleClose} />
        </Dialog>
    );
}