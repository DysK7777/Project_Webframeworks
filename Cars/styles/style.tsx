import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({

    stickyText: {
        paddingTop: 32,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        textAlign: 'center',
        backgroundColor: 'grey',
        color: '#fff',
        padding: 10,
        fontSize: 16,
        fontWeight: 'bold',
        zIndex: 10, // Ensures it stays on top of other components
    },
    input: {
        marginTop: 10,
        padding: 10,
        fontSize: 16,
        marginBottom: 20,
        width: 300,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    paddingTop: {
        marginTop: 50
    },
    carModels: {
        marginTop: 50,
        fontWeight: "bold",
        fontSize: 20
    },

    listItem: {
        padding: 15,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 5,
        elevation: 3,
    },
    carName: {
        fontSize: 16,
        color: '#333',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dimmed overlay
    },
    modalWindow: {
        width: '90%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5,
    },
    modalHeader: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 10,
        color: '#333',
    },
    button: {
        backgroundColor: '#6200ee',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    closeButton: {
        backgroundColor: '#e53935',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    heartButton: {
        marginTop: 20,
    },
    heart: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    container: {
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    inputNew: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
});