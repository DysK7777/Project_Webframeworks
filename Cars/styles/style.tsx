import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    body: {

    },

    stickyText: {
        paddingTop: 32,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        textAlign: 'center',
        backgroundColor: '#6200ee',
        color: 'white',
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
    deleteButton: {
        padding: 1,
        borderRadius: 5,
        marginRight: 0,
    },
    carInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    paddingTop: {
        marginTop: 50,
        marginBottom: 120
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
        elevation: 3
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
    profileContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    profilePageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    profileImageContainer: {
        alignItems: 'center',
        marginTop: 20,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#6200ee',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 10,
    },
    mapContainer: {
        width: '100%',
        height: 300,
        marginTop: 20,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        borderWidth: 2,
        borderColor: 'grey',
    },
});