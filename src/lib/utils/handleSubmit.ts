import { applyAction } from "$app/forms"
import { toast } from "$lib/stores/toast"
import { type ActionResult } from "@sveltejs/kit"

type Callback = {
    onSubmit?: () => void
    onSuccess?: (data: Record<string, any> | undefined) => void
    onFailure?: (data: Record<string, any> | undefined) => void
}

export default (title: string, { onSubmit = undefined, onSuccess = undefined, onFailure = undefined }: Callback) => {
    onSubmit && onSubmit()
    const toastId = toast.loading(title)
    // 
    return async ({ result }: { result: ActionResult }) => {
        await applyAction(result)
        toast.destroy(toastId)

        if (result.type == 'success') {
            onSuccess && onSuccess(result.data)
            console.log('Success : ', result.data);
            toast.success(title)
        }

        if (result.type == 'failure') {
            onFailure && onFailure(result.data)
            console.log('Failure : ', result.data);
            toast.error(result.data?.message ?? title)
        }
    }
}