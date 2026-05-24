const API_URL = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api'}/syllabus`;

export const getUniversities = async () => {
    try {
        const response = await fetch(`${API_URL}/universities`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching universities", error);
        return [];
    }
};

export const getRegulations = async (universityId) => {
    if (!universityId) return [];
    try {
        const response = await fetch(`${API_URL}/regulations?universityId=${universityId}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching regulations", error);
        return [];
    }
};

export const getBranches = async () => {
    try {
        const response = await fetch(`${API_URL}/branches`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching branches", error);
        return [];
    }
};

export const getSemesters = async () => {
    try {
        const response = await fetch(`${API_URL}/semesters`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching semesters", error);
        return [];
    }
};
