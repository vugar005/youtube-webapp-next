import { Fragment, useCallback, useEffect, useState } from 'react'
import BrowserVideos from '@/components/browse-videos/browse-videos'
import Playground from '@/components/playground/playground'
import PolicyTermsDialog from '@/components/policy-terms-dialog/policy-terms-dialog'
import { Dialog } from '@mui/material'
import { SessionStorageEnum } from '@/lib/ui/constants/session-storage.constants'

export default function Dashboard() {
  const [isPolicyDialogOpen, setIsPolicyDialogOpen] = useState<boolean>(true);

  const handleClose = useCallback(() => {
    setIsPolicyDialogOpen(false);
    sessionStorage.setItem(SessionStorageEnum.IS_APP_POLICY_AGREED, 'true');
  }, []);

  useEffect(() => {
    const isAppPolicyAgreedItem = sessionStorage.getItem(SessionStorageEnum.IS_APP_POLICY_AGREED);
    const isAppPolicyAgreed: boolean = isAppPolicyAgreedItem === 'true';

    if (!isAppPolicyAgreed) {
      setIsPolicyDialogOpen(true);
    } else {
      setIsPolicyDialogOpen(false);
    }
  }, []);

  return (
    <Fragment>
      <Dialog open={isPolicyDialogOpen}>
        <PolicyTermsDialog handleClose={handleClose} />
      </Dialog>
      {/* <Playground/> */}
      <BrowserVideos />
    </Fragment>
  )
}
