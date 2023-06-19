

export async function getPEPList() {
    try {

    } catch (error) {
        console.error(error);
        
        return {
            success: false,
            message: error instanceof Error ? error.message : JSON.stringify(error)
        }
    }
}